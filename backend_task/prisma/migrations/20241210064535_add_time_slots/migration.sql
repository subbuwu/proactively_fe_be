/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[speakerId,timeSlotId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timeSlotId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Booking_speakerId_dateTime_key` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `dateTime`,
    ADD COLUMN `timeSlotId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `TimeSlot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `speakerId` INTEGER NOT NULL,
    `slotTime` DATETIME(3) NOT NULL,
    `isBooked` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `TimeSlot_speakerId_slotTime_key`(`speakerId`, `slotTime`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_speakerId_timeSlotId_key` ON `Booking`(`speakerId`, `timeSlotId`);

-- AddForeignKey
ALTER TABLE `TimeSlot` ADD CONSTRAINT `TimeSlot_speakerId_fkey` FOREIGN KEY (`speakerId`) REFERENCES `Speaker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_timeSlotId_fkey` FOREIGN KEY (`timeSlotId`) REFERENCES `TimeSlot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
