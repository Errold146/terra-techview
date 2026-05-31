-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'pro', 'premium');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "stripeSubscriptionId" TEXT,
DROP COLUMN "plan",
ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'free';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "plan" "Plan" NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "stripeSessionId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT;