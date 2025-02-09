-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "plan" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "user_info" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "goal" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    CONSTRAINT "user_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_breakfast" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "user_breakfast_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_lunch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "user_lunch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_snack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "user_snack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_dinner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "user_dinner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_moreInfos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "dietSchedule" TEXT NOT NULL,
    "chocolate" TEXT NOT NULL,
    CONSTRAINT "user_moreInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "foodItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_breakfastId" TEXT,
    "user_lunchId" TEXT,
    "user_snackId" TEXT,
    "user_dinnerId" TEXT,
    CONSTRAINT "foodItem_user_breakfastId_fkey" FOREIGN KEY ("user_breakfastId") REFERENCES "user_breakfast" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "foodItem_user_lunchId_fkey" FOREIGN KEY ("user_lunchId") REFERENCES "user_lunch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "foodItem_user_snackId_fkey" FOREIGN KEY ("user_snackId") REFERENCES "user_snack" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "foodItem_user_dinnerId_fkey" FOREIGN KEY ("user_dinnerId") REFERENCES "user_dinner" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_userId_key" ON "user_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_breakfast_userId_key" ON "user_breakfast"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_lunch_userId_key" ON "user_lunch"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_snack_userId_key" ON "user_snack"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_dinner_userId_key" ON "user_dinner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_moreInfos_userId_key" ON "user_moreInfos"("userId");
