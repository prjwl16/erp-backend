/*
  Warnings:

  - The values [RECEIVED] on the enum `PURCHASE_ORDER_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PURCHASE_ORDER_STATUS_new" AS ENUM ('PLACED', 'IN_TRANSIT', 'DELIVERED');
ALTER TABLE "PurchaseOrder" ALTER COLUMN "orderStatus" DROP DEFAULT;
ALTER TABLE "PurchaseOrder" ALTER COLUMN "orderStatus" TYPE "PURCHASE_ORDER_STATUS_new" USING ("orderStatus"::text::"PURCHASE_ORDER_STATUS_new");
ALTER TABLE "PurchaseOrderStatusLog" ALTER COLUMN "status" TYPE "PURCHASE_ORDER_STATUS_new" USING ("status"::text::"PURCHASE_ORDER_STATUS_new");
ALTER TYPE "PURCHASE_ORDER_STATUS" RENAME TO "PURCHASE_ORDER_STATUS_old";
ALTER TYPE "PURCHASE_ORDER_STATUS_new" RENAME TO "PURCHASE_ORDER_STATUS";
DROP TYPE "PURCHASE_ORDER_STATUS_old";
ALTER TABLE "PurchaseOrder" ALTER COLUMN "orderStatus" SET DEFAULT 'PLACED';
COMMIT;