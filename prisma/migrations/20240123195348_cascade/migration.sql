-- DropForeignKey
ALTER TABLE "DiscussionCommentFork" DROP CONSTRAINT "DiscussionCommentFork_discussionCommentId_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionCommentFork" DROP CONSTRAINT "DiscussionCommentFork_userCommentId_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionFiles" DROP CONSTRAINT "DiscussionFiles_discussionId_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionTags" DROP CONSTRAINT "DiscussionTags_discussionId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteProject" DROP CONSTRAINT "FavoriteProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteProject" DROP CONSTRAINT "FavoriteProject_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectComment" DROP CONSTRAINT "ProjectComment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCommentFork" DROP CONSTRAINT "ProjectCommentFork_projectCommentId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCommentFork" DROP CONSTRAINT "ProjectCommentFork_userCommentId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectFiles" DROP CONSTRAINT "ProjectFiles_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTags" DROP CONSTRAINT "ProjectTags_projectId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectFiles" ADD CONSTRAINT "ProjectFiles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteProject" ADD CONSTRAINT "FavoriteProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteProject" ADD CONSTRAINT "FavoriteProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectComment" ADD CONSTRAINT "ProjectComment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionFiles" ADD CONSTRAINT "DiscussionFiles_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTags" ADD CONSTRAINT "ProjectTags_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionTags" ADD CONSTRAINT "DiscussionTags_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionCommentFork" ADD CONSTRAINT "DiscussionCommentFork_discussionCommentId_fkey" FOREIGN KEY ("discussionCommentId") REFERENCES "DiscussionComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscussionCommentFork" ADD CONSTRAINT "DiscussionCommentFork_userCommentId_fkey" FOREIGN KEY ("userCommentId") REFERENCES "UserComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCommentFork" ADD CONSTRAINT "ProjectCommentFork_projectCommentId_fkey" FOREIGN KEY ("projectCommentId") REFERENCES "ProjectComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCommentFork" ADD CONSTRAINT "ProjectCommentFork_userCommentId_fkey" FOREIGN KEY ("userCommentId") REFERENCES "UserComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
