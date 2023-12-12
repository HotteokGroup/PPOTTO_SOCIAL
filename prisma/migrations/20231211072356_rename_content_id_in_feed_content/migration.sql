/*
  Warnings:

  - You are about to drop the column `contentId` on the `FeedContent` table. All the data in the column will be lost.
  - Added the required column `userFileStoreId` to the `FeedContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `FeedContent_contentId` ON `FeedContent`;

-- AlterTable
ALTER TABLE `FeedContent` DROP COLUMN `contentId`,
    ADD COLUMN `userFileStoreId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `FeedContent_userFileStoreId` ON `FeedContent`(`userFileStoreId`);
