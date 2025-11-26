import Ticket from '../models/Ticket.model.js';
import User from '../models/User.model.js';

// @desc    Get dashboard statistics
// @route   GET /api/analytics/dashboard
// @access  Private
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: 'open' });
    const inProgressTickets = await Ticket.countDocuments({ status: 'in-progress' });
    const resolvedTickets = await Ticket.countDocuments({ status: 'resolved' });

    // Tickets by category
    const categoryStats = await Ticket.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    const ticketsByCategory = categoryStats.map((stat) => ({
      name: stat._id,
      count: stat.count,
      percentage: Math.round((stat.count / totalTickets) * 100),
    }));

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await Ticket.find({
      createdAt: { $gte: sevenDaysAgo },
    })
      .populate('createdBy', 'name')
      .select('title status createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    // Ticket trends for last 7 days (counts per day per status)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const trendsAgg = await Ticket.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $project: {
          day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          status: 1,
        },
      },
      {
        $group: {
          _id: { day: '$day', status: '$status' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.day': 1 },
      },
    ]);

    // Build labels and datasets
    const dayMap = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      dayMap[key] = { label: key, open: 0, 'in-progress': 0, resolved: 0 };
    }

    trendsAgg.forEach((t) => {
      const day = t._id.day;
      const status = t._id.status;
      if (!dayMap[day]) return;
      if (status === 'open') dayMap[day].open = t.count;
      else if (status === 'in-progress') dayMap[day]['in-progress'] = t.count;
      else if (status === 'resolved') dayMap[day].resolved = t.count;
    });

    const labels = Object.keys(dayMap).map((k) => dayMap[k].label);
    const ticketTrends = {
      labels,
      open: Object.keys(dayMap).map((k) => dayMap[k].open),
      inProgress: Object.keys(dayMap).map((k) => dayMap[k]['in-progress']),
      resolved: Object.keys(dayMap).map((k) => dayMap[k].resolved),
    };

    res.status(200).json({
      status: 'success',
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      ticketsByCategory,
      recentActivity,
      ticketTrends,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get ticket statistics
// @route   GET /api/analytics/tickets
// @access  Private (Manager/Admin)
export const getTicketStats = async (req, res, next) => {
  try {
    // Calculate MTTR (Mean Time To Resolution)
    const resolvedTickets = await Ticket.find({
      status: 'resolved',
      resolvedAt: { $exists: true },
    });

    let totalResolutionTime = 0;
    resolvedTickets.forEach((ticket) => {
      const resolutionTime = ticket.resolvedAt - ticket.createdAt;
      totalResolutionTime += resolutionTime;
    });

    const avgResolutionTime = resolvedTickets.length
      ? totalResolutionTime / resolvedTickets.length / (1000 * 60 * 60) // Convert to hours
      : 0;

    // SLA Compliance (assuming 24 hours SLA)
    const slaCompliantTickets = resolvedTickets.filter((ticket) => {
      const resolutionTime = (ticket.resolvedAt - ticket.createdAt) / (1000 * 60 * 60);
      return resolutionTime <= 24;
    });

    const slaCompliance = resolvedTickets.length
      ? Math.round((slaCompliantTickets.length / resolvedTickets.length) * 100)
      : 0;

    res.status(200).json({
      status: 'success',
      mttr: `${avgResolutionTime.toFixed(1)}h`,
      slaCompliance,
      totalResolved: resolvedTickets.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get agent performance
// @route   GET /api/analytics/agents
// @access  Private (Manager/Admin)
export const getAgentPerformance = async (req, res, next) => {
  try {
    const agents = await User.find({ role: { $in: ['agent', 'manager'] } });

    const agentPerformance = await Promise.all(
      agents.map(async (agent) => {
        const assignedTickets = await Ticket.countDocuments({ assignedTo: agent._id });
        const resolvedTickets = await Ticket.countDocuments({
          assignedTo: agent._id,
          status: 'resolved',
        });

        const tickets = await Ticket.find({
          assignedTo: agent._id,
          status: 'resolved',
          resolvedAt: { $exists: true },
        });

        let totalTime = 0;
        tickets.forEach((ticket) => {
          totalTime += (ticket.resolvedAt - ticket.createdAt) / (1000 * 60 * 60);
        });

        const avgTime = tickets.length ? totalTime / tickets.length : 0;

        return {
          name: agent.name,
          resolved: resolvedTickets,
          assigned: assignedTickets,
          avgTime: avgTime.toFixed(1),
        };
      })
    );

    res.status(200).json({
      status: 'success',
      agentPerformance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category statistics
// @route   GET /api/analytics/categories
// @access  Private (Manager/Admin)
export const getCategoryStats = async (req, res, next) => {
  try {
    const categoryStats = await Ticket.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const formattedStats = categoryStats.map((stat) => ({
      name: stat._id.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      count: stat.count,
    }));

    res.status(200).json({
      status: 'success',
      categoryStats: formattedStats,
    });
  } catch (error) {
    next(error);
  }
};
