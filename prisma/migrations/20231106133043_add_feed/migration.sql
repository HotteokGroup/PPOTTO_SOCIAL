-- CreateTable
CREATE TABLE `ShareAlbumFeed` (
    `id` VARCHAR(191) NOT NULL,
    `shareAlbumId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ShareAlbumFeed_id`(`id`),
    INDEX `ShareAlbumFeed_shareAlbumId`(`shareAlbumId`),
    INDEX `ShareAlbumFeed_userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedContent` (
    `id` VARCHAR(191) NOT NULL,
    `feedId` VARCHAR(191) NOT NULL,
    `contentId` VARCHAR(191) NOT NULL,
    `type` ENUM('IMAGE', 'VIDEO') NOT NULL,
    `contentSmallUrl` VARCHAR(191) NULL,
    `contentMediumUrl` VARCHAR(191) NULL,
    `contentLargeUrl` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FeedContent_id`(`id`),
    INDEX `FeedContent_feedId`(`feedId`),
    INDEX `FeedContent_contentId`(`contentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShareAlbumFeed` ADD CONSTRAINT `ShareAlbumFeed_shareAlbumId_fkey` FOREIGN KEY (`shareAlbumId`) REFERENCES `ShareAlbum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedContent` ADD CONSTRAINT `FeedContent_feedId_fkey` FOREIGN KEY (`feedId`) REFERENCES `ShareAlbumFeed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
