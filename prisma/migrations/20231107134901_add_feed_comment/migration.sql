-- CreateTable
CREATE TABLE `FeedComment` (
    `id` VARCHAR(191) NOT NULL,
    `feedId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FeedComment_id`(`id`),
    INDEX `FeedComment_feedId`(`feedId`),
    INDEX `FeedComment_userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FeedComment` ADD CONSTRAINT `FeedComment_feedId_fkey` FOREIGN KEY (`feedId`) REFERENCES `ShareAlbumFeed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
