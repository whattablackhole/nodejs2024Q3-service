-- DropForeignKey
ALTER TABLE "FavAlbum" DROP CONSTRAINT "FavAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "FavArtist" DROP CONSTRAINT "FavArtist_artistId_fkey";

-- DropForeignKey
ALTER TABLE "FavTrack" DROP CONSTRAINT "FavTrack_trackId_fkey";

-- AddForeignKey
ALTER TABLE "FavAlbum" ADD CONSTRAINT "FavAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavArtist" ADD CONSTRAINT "FavArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavTrack" ADD CONSTRAINT "FavTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
