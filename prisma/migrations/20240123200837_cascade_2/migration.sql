-- DropForeignKey
ALTER TABLE "FavoriteDiscussion" DROP CONSTRAINT "FavoriteDiscussion_discussionId_fkey";

-- AddForeignKey
ALTER TABLE "FavoriteDiscussion" ADD CONSTRAINT "FavoriteDiscussion_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
