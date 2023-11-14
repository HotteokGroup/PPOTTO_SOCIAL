-- CreateTable
CREATE TABLE `FeedCollection` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FeedCollection_id`(`id`),
    INDEX `FeedCollection_userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedContentsOnCollection` (
    `id` VARCHAR(191) NOT NULL,
    `feedCollectionId` VARCHAR(191) NOT NULL,
    `shareAlbumFeedId` VARCHAR(191) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FeedContentsOnCollection_id`(`id`),
    INDEX `FeedContentsOnCollection_feedCollectionId`(`feedCollectionId`),
    INDEX `FeedContentsOnCollection_shareAlbumFeedId`(`shareAlbumFeedId`),
    INDEX `FeedContentsOnCollection_feedCollectionId_shareAlbumFeedId`(`feedCollectionId`, `shareAlbumFeedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FeedContentsOnCollection` ADD CONSTRAINT `FeedContentsOnCollection_feedCollectionId_fkey` FOREIGN KEY (`feedCollectionId`) REFERENCES `FeedCollection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedContentsOnCollection` ADD CONSTRAINT `FeedContentsOnCollection_shareAlbumFeedId_fkey` FOREIGN KEY (`shareAlbumFeedId`) REFERENCES `ShareAlbumFeed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
