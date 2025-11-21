import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { ticketService } from '@/services/ticketService';
import { useAuthStore } from '@/store/authStore';
import { formatDate } from '@/utils/helpers';

const CommentSection = ({ ticket, onCommentAdded }) => {
  const { user } = useAuthStore();
  const { register, handleSubmit, reset } = useForm();

  const addCommentMutation = useMutation(
    (comment) => ticketService.addComment(ticket._id, comment),
    {
      onSuccess: () => {
        toast.success('Comment added');
        reset();
        onCommentAdded();
      },
      onError: () => {
        toast.error('Failed to add comment');
      },
    }
  );

  const onSubmit = (data) => {
    addCommentMutation.mutate(data);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          <div className="flex-1">
            <textarea
              rows={3}
              placeholder="Add a comment..."
              className="input-field"
              {...register('content', { required: true })}
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={addCommentMutation.isLoading}
                className="btn-primary flex items-center"
              >
                <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                {addCommentMutation.isLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {!ticket.comments || ticket.comments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No comments yet</p>
        ) : (
          ticket.comments.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                  {comment.author?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {comment.author?.name || 'Unknown'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
