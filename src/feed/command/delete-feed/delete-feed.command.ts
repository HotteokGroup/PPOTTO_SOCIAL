export class DeleteFeedCommand {
  feedId: string;

  shareAlbumId: string;

  constructor(params: Required<DeleteFeedCommand>) {
    Object.assign(this, params);
  }
}
