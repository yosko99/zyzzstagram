-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "storyId" TEXT;

-- CreateTable
CREATE TABLE "_StoryLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StoryLikes_AB_unique" ON "_StoryLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_StoryLikes_B_index" ON "_StoryLikes"("B");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoryLikes" ADD CONSTRAINT "_StoryLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoryLikes" ADD CONSTRAINT "_StoryLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
