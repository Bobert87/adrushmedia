-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'MAXED_OUT', 'DELETED');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('VEHICLE', 'LOCATION');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('STRING', 'FLOAT', 'INT', 'BOOLEAN', 'DATE');

-- CreateEnum
CREATE TYPE "Placement" AS ENUM ('VEHICLE_ROOF', 'VEHICLE_INTERIOR', 'VEHICLE_SIDE', 'VEHICLE_BACK', 'LOCATION_OUTDOOR', 'LOCATION_INDOOR');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('SEDAN', 'HATCHBACK', 'SUV', 'TRUCK', 'VAN', 'BUS', 'PUBLIC_TRANSPORT');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('AIRPORT', 'HOTEL', 'RESTAURANT', 'MALL', 'GAS_STATION', 'PARK', 'HOSPITAL', 'PHARMACY', 'GYM', 'BAR', 'CAFE', 'BAKERY', 'GROCERY', 'SUPERMARKET', 'CONVENIENCE_STORE', 'SHOPPING_MALL', 'BUS_STATION', 'TRAIN_STATION', 'PARKING', 'CAR_WASH', 'ROAD', 'HIGHWAY', 'WALKWAY');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('CARTOP', 'TABLET', 'BILLBOARD', 'SMARTTV');

-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "AdvertiserType" AS ENUM ('AGENCY', 'BRAND', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "Term" AS ENUM ('NET_30', 'NET_60', 'NET_90', 'PREPAID');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'PENDING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FilterType" AS ENUM ('GEO', 'DEVICE', 'VEHICLE', 'HOURS', 'DAYS', 'WEATHER');

-- CreateEnum
CREATE TYPE "FilterOperations" AS ENUM ('EQUALS', 'NOT_EQUALS', 'GREATER_THAN', 'LESS_THAN', 'GREATER_THAN_OR_EQUAL', 'LESS_THAN_OR_EQUAL', 'BETWEEN', 'NOT_BETWEEN', 'IN', 'NOT_IN', 'LIKE', 'NOT_LIKE', 'IS_NULL', 'IS_NOT_NULL');

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alternativeEmail" TEXT,
    "phone" TEXT NOT NULL,
    "alternativePhone" TEXT,
    "countryISO" VARCHAR(2) NOT NULL,
    "countryName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT,
    "department" TEXT,
    "municipality" TEXT,
    "zone" TEXT,
    "driversLicense" TEXT NOT NULL,
    "driversLicenseURL" TEXT NOT NULL,
    "rideSharingCompany" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "defaultGeoZoneId" INTEGER,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "taxNumber" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "term" "Term" NOT NULL,
    "creditLimit" DECIMAL(65,30) NOT NULL,
    "status" "AccountStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "timezone" TEXT,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "type" "AssetType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "publisherId" INTEGER NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetDetail" (
    "id" SERIAL NOT NULL,
    "assetId" INTEGER NOT NULL,
    "field" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AssetDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "type" "DeviceType" NOT NULL,
    "status" "DeviceStatus" NOT NULL,
    "placement" "Placement" NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "screenWidth" INTEGER NOT NULL,
    "screenHeight" INTEGER NOT NULL,
    "resolution" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "osVersion" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "assetId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertiser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AdvertiserType" NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "term" "Term" NOT NULL,
    "status" "AccountStatus" NOT NULL,
    "timezone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Advertiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "advertiserId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "maxBid" DOUBLE PRECISION NOT NULL,
    "budget" DECIMAL(65,30) NOT NULL,
    "status" "CampaignStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "targetDeviceType" TEXT NOT NULL,
    "creativeFormat" TEXT NOT NULL,
    "creativeURL" TEXT NOT NULL,
    "landingURL" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Polygon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordinates" DOUBLE PRECISION[],

    CONSTRAINT "Polygon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolygoneZone" (
    "id" SERIAL NOT NULL,
    "polygonId" INTEGER NOT NULL,
    "zoneId" INTEGER NOT NULL,

    CONSTRAINT "PolygoneZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignTag" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "CampaignTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FilterType" NOT NULL,
    "operation" "FilterOperations" NOT NULL,
    "value" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3) NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "h3Index" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleDetail" (
    "id" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "adId" INTEGER NOT NULL,

    CONSTRAINT "ScheduleDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdImpression" (
    "id" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "adId" INTEGER NOT NULL,
    "coordinate" TEXT NOT NULL,
    "deliveredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdImpression_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetDetail" ADD CONSTRAINT "AssetDetail_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "Advertiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolygoneZone" ADD CONSTRAINT "PolygoneZone_polygonId_fkey" FOREIGN KEY ("polygonId") REFERENCES "Polygon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolygoneZone" ADD CONSTRAINT "PolygoneZone_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignTag" ADD CONSTRAINT "CampaignTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignTag" ADD CONSTRAINT "CampaignTag_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filter" ADD CONSTRAINT "Filter_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDetail" ADD CONSTRAINT "ScheduleDetail_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDetail" ADD CONSTRAINT "ScheduleDetail_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
