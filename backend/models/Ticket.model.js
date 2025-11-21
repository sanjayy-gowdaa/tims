import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const historySchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const attachmentSchema = new mongoose.Schema({
  name: String,
  url: String,
  size: Number,
  mimeType: String,
});

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'pending', 'resolved', 'closed'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    category: {
      type: String,
      enum: ['it-support', 'hr', 'facilities', 'finance', 'security', 'operations', 'other'],
      required: [true, 'Category is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [commentSchema],
    attachments: [attachmentSchema],
    history: [historySchema],
    resolvedAt: {
      type: Date,
    },
    closedAt: {
      type: Date,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

// Auto-generate ticket number
ticketSchema.pre('save', async function (next) {
  if (!this.ticketNumber) {
    const count = await mongoose.model('Ticket').countDocuments();
    this.ticketNumber = `TKT-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Add to history before saving
ticketSchema.pre('save', function (next) {
  if (this.isNew) {
    this.history.push({
      description: 'Ticket created',
      user: this.createdBy,
    });
  }
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
