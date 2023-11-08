export class DeleteShareAlbumFeedCommand {
  feedId: string;

  shareAlbumId: string;

  constructor(params: Required<DeleteShareAlbumFeedCommand>) {
    Object.assign(this, params);
  }
}
