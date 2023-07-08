export type JoinRoomsParams = {
  rooms: Array<string>;
};

export type CreateRoomParams = {
  creatorId: string;
  users: Array<string>;
};

export type DatabaseRoom = {
  userId: string;
  roomId: string;
  room: {
    creatorId: string;
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type TransformedRoom = {
  id: string;
  creatorId: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Room = {
  roomId: string;
  users: Array<string>;
};

export type Rooms = Array<Room>;
