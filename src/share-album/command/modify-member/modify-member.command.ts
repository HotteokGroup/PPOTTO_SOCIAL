import { ShareAlbumMemberRole } from '@prisma/client';

export class ModifyShareAlbumMemberCommand {
  /** 그룹 아이디 */
  readonly albumId: string;

  /** 고객 아이디 */
  readonly userId: number;

  /** 그룹 멤버의 권한 */
  readonly role: ShareAlbumMemberRole;

  constructor(params: ModifyShareAlbumMemberCommand) {
    Object.assign(this, params);
  }
}

export class ModifyShareAlbumMemberCommandResult {
  /** 그룹 아이디 */
  readonly albumId: string;

  /** 고객 아이디 */
  readonly userId: number;

  /** 그룹 멤버의 권한 */
  readonly role: ShareAlbumMemberRole;

  constructor(params: ModifyShareAlbumMemberCommandResult) {
    Object.assign(this, params);
  }
}
