import instance from "./base";
import { OutputData } from "@editorjs/editorjs";

// 게시글 리스트 조회
export async function fetchBoardList(options: {
  pageNo?: number;
  size?: number;
  category?: string; //1: 정보, 2: 재미, 3: 투자, 4: 기업, 5: 고급
  sort?: string; //최신순, 인기순
  userId?: number;
}): Promise<{ data: BoardListResponse }> {
  const {
    pageNo = 0,
    size = 10,
    category = "1",
    sort = "최신순",
    userId = 1,
  } = options;
  const response = await instance.get<BoardListResponse>(
    `/board-service/boards?pageNo=${pageNo}&size=${size}&category=${category}&sort=${sort}&userId=${userId}`
  );
  return { data: response.data };
}

export interface BoardListResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    summary: string;
    thumbnail: string | null;
    createdTime: string;
    likeCount: number;
    commentCount: number;
    authorNickname: string;
    authorProfile: string;
    locked: boolean;
  }[];
}

// 각 게시글 조회
export async function fetchBoardDetail(
  boardId: string
): Promise<{ data: BoardResponse }> {
  const response = await instance.get<BoardResponse>(
    `/board-service/boards/${boardId}`
  );

  console.log("dd", response);
  return { data: response.data };
}

export interface BoardResponse {
  success: boolean;
  message: string;
  data: {
    title: string;
    content: string;
    category: {
      id: number;
      name: string;
    };
    likeCount: number;
    commentCount: number;
    comments: {
      id: number;
      content: string;
      authorId: number;
      authorName: string;
      authorProfile: string;
      replies: {
        id: number;
        content: string;
        authorId: number;
        authorName: string;
        authorProfile: string;
        createdTime: string;
      }[];
      createdTime: string;
    }[];
    createdTime: string;
    authorId: number;
    authorNickname: string;
    authorProfile: string;
    liked: boolean;
    bookmarked: boolean;
    locked: boolean;
    unlockedCount: number;
  };
}

export interface CommentResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    content: string;
    authorId: number;
    authorName: string;
    authorProfile: string;
    replies: {
      id: number;
      content: string;
      authorId: number;
      authorName: string;
      authorProfile: string;
      createdTime: string;
    }[];
    createdTime: string;
    deleted: boolean;
  }[];
}

export async function fetchComment(
  boardId: string
): Promise<{ data: CommentResponse }> {
  const response = await instance.get<CommentResponse>(
    `/board-service/boards/${boardId}/comments`
  );
  return { data: response.data };
}

export async function createBookmark(boardId: string) {
  await instance.post(`/board-service/boards/${boardId}/bookmark`, null, {});
}

export async function createLike(boardId: string) {
  await instance.post(`/board-service/boards/${boardId}/like`, null, {});
}

export async function deleteBoard(boardId: string) {
  await instance.delete(`/board-service/boards/${boardId}`, {});
}

//댓글

type commentData = {
  content: string;
  parentId?: number;
};

export async function createComment(boardId: string, commentData: commentData) {
  await instance.post(`/board-service/boards/${boardId}/comments`, commentData);
}

export async function deleteComment(commentId: number) {
  await instance.delete(
    `/board-service/boards/{boardId}/comments/${commentId}`
  );
}

export interface BoardRequest {
  title: String;
  content: OutputData;
}

export interface CreateBoardRequest extends BoardRequest {
  category: String | null;
  productId: String | null;
  challengeId: String | null;
  locked: boolean | null;
}

export async function createBoard(requestBody: CreateBoardRequest) {
  try {
    const response = await instance.post(`/board-service/boards`, requestBody);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export interface UpdateBoardRequest extends BoardRequest {
  boardId: string;
}

export async function updateBoard(
  boardId: string,
  requestBody: UpdateBoardRequest
) {
  const response = await instance.put(
    `board-service/boards/${boardId}`,
    requestBody
  );

  return response.data;
}

//팔로우 토글
export async function followUser(userId: number) {
  console.log("팔로우");
  await instance.post(`/user-service/users/${userId}/follow`);
}

//팔로잉 상태 확인
export async function fetchFollowStatus(
  userId: number
): Promise<{ data: followStatusResponse }> {
  const response = await instance.get<followStatusResponse>(
    `user-service/users/${userId}/follow`
  );
  console.log(response.data);
  return { data: response.data };
}

export interface followStatusResponse {
  success: boolean;
  message: string;
  data: {
    followers: number;
    followings: number;
    isFollow: boolean;
  };
}

//구매하기
interface UnlockBoardResponse {
  success: boolean;
  message: string;
  data?: string | any[];
}

export async function unlockBoard(boardId: number): Promise<string> {
  const response = await instance.post<UnlockBoardResponse>(
    `/board-service/boards/${boardId}/unlock`
  );
  return response.data.message;
}
