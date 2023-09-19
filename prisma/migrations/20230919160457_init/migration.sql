-- CreateTable
CREATE TABLE `ShareAlbum` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `thumbnailIId` VARCHAR(191) NULL,
    `smallThumbnailIUrl` VARCHAR(191) NULL,
    `mediumThumbnailIUrl` VARCHAR(191) NULL,
    `largeThumbnailIUrl` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShareAlbumMember` (
    `id` VARCHAR(191) NOT NULL,
    `shareAlbumId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `role` ENUM('OWNER', 'EDITOR', 'VIEWER', 'TEMPORARY') NOT NULL,
    `joinedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShareAlbumHistory` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('CREATE_SHARE_ALBUM', 'UPDATE_SHARE_ALBUM', 'DELETE_SHARE_ALBUM', 'JOIN_SHARE_ALBUM', 'LEAVE_SHARE_ALBUM', 'INVITE_SHARE_ALBUM', 'REMOVE_SHARE_ALBUM') NOT NULL,
    `shareAlbumId` VARCHAR(191) NOT NULL,
    `contentId` VARCHAR(191) NULL,
    `userId` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
