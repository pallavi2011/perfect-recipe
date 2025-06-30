import React from "react";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";


const CommentThread = ({ comment, handleReplyClick, replyingTo, replyText, setReplyText, handleReplySubmit, timeAgo }) =>{
  return (
    <div className={comment.parentId ? "mb-4 ml-12" : "border-b border-gray-200 pb-8 mb-8"}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={comment?.user?.image || comment?.user?.avatar}
            alt={comment?.user?.name}
            className={comment.parentId ? "w-12 h-12 rounded-full object-cover" : "w-14 h-14 rounded-full object-cover"}
          />
          <div>
            <div className="font-semibold text-base text-gray-900">{comment?.user?.name}</div>
            <div className={comment.parentId ? "text-gray-500 text-sm" : "text-gray-500 text-xs"}>
              {timeAgo(comment?.createdAt)}
            </div>
          </div>
        </div>
        <BsThreeDots className={comment.parentId ? "text-xl text-gray-400 cursor-pointer" : "text-2xl text-gray-400 cursor-pointer"} />
      </div>
      <div className={`mt-4 text-gray-900 text-base break-words ${comment.parentId ? "ml-14" : "ml-16"}`}>
        {comment?.text}
      </div>
      <div className={`flex items-center gap-8 mt-4 text-[#B55D51] ${comment.parentId ? "ml-14" : "ml-16"}`}>
        <button
          className="flex items-center gap-2 hover:underline"
          onClick={() => handleReplyClick(comment.parentId ? comment.parentId : comment.id, comment.id)}
        >
          <FaRegCommentDots className="text-lg" />
          <span>Reply</span>
        </button>
        <div className="flex items-center gap-2">
          <FaRegHeart className="text-lg" />
          <span>{comment.likes}</span>
        </div>
      </div>
      {/* Reply input line for this comment/reply */}
      {replyingTo.commentId === (comment.parentId ? comment.parentId : comment.id) && replyingTo.replyId === comment.id && (
        <div className="mt-4 flex items-center gap-2 ml-14">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B55D51]"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleReplySubmit(comment.parentId ? comment.parentId : comment.id, comment.id);
            }}
            autoFocus
          />
          <button
            className="bg-[#B55D51] text-white px-4 py-2 rounded hover:bg-[#a04d43] transition"
            onClick={() => handleReplySubmit(comment.parentId ? comment.parentId : comment.id, comment.id)}
          >
            Reply
          </button>
        </div>
      )}
      {/* Render nested replies recursively */}
      {comment?.replies?.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              handleReplyClick={handleReplyClick}
              replyingTo={replyingTo}
              replyText={replyText}
              setReplyText={setReplyText}
              handleReplySubmit={handleReplySubmit}
              timeAgo={timeAgo}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentThread;
