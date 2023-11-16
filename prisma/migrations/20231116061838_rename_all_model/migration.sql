/*
  Warnings:

  - You are about to drop the `FeedCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeedContentsOnCollection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShareAlbumFeed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FeedComment` DROP FOREIGN KEY `FeedComment_feedId_fkey`;

-- DropForeignKey
ALTER TABLE `FeedContent` DROP FOREIGN KEY `FeedContent_feedId_fkey`;

-- DropForeignKey
ALTER TABLE `FeedContentsOnCollection` DROP FOREIGN KEY `FeedContentsOnCollection_feedCollectionId_fkey`;

-- DropForeignKey
ALTER TABLE `FeedContentsOnCollection` DROP FOREIGN KEY `FeedContentsOnCollection_shareAlbumFeedId_fkey`;

-- DropForeignKey
ALTER TABLE `ShareAlbumFeed` DROP FOREIGN KEY `ShareAlbumFeed_shareAlbumId_fkey`;

-- DropTable
DROP TABLE `FeedCollection`;

-- DropTable
DROP TABLE `FeedContentsOnCollection`;

-- DropTable
DROP TABLE `ShareAlbumFeed`;

-- CreateTable
CREATE TABLE `Feed` (
    `id` VARCHAR(191) NOT NULL,
    `shareAlbumId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Feed_id`(`id`),
    INDEX `Feed_shareAlbumId`(`shareAlbumId`),
    INDEX `Feed_userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collection` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Collection_id`(`id`),
    INDEX `Collection_userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedsOnCollection` (
    `id` VARCHAR(191) NOT NULL,
    `collectionId` VARCHAR(191) NOT NULL,
    `feedId` VARCHAR(191) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FeedsOnCollection_id`(`id`),
    INDEX `FeedsOnCollection_collectionId`(`collectionId`),
    INDEX `FeedsOnCollection_feedId`(`feedId`),
    INDEX `FeedsOnCollection_collectionId_feedId`(`collectionId`, `feedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Feed` ADD CONSTRAINT `Feed_shareAlbumId_fkey` FOREIGN KEY (`shareAlbumId`) REFERENCES `ShareAlbum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedContent` ADD CONSTRAINT `FeedContent_feedId_fkey` FOREIGN KEY (`feedId`) REFERENCES `Feed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedComment` ADD CONSTRAINT `FeedComment_feedId_fkey` FOREIGN KEY (`feedId`) REFERENCES `Feed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedsOnCollection` ADD CONSTRAINT `FeedsOnCollection_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedsOnCollection` ADD CONSTRAINT `FeedsOnCollection_feedId_fkey` FOREIGN KEY (`feedId`) REFERENCES `Feed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
