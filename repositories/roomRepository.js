const Room = require('../models/room');

class RoomMeet {
    async createRoom(roomId, userId) {
        const room = new Room({ roomId, participants: [userId] });
        await room.save();
        return room;
    }

    async joinRoom(roomId, userId) {
        const room = await Room.findOne({ roomId });
        if (room) {
            room.participants.push(userId);
            await room.save();
        }
        return room;
    }
}

module.exports = new RoomMeet();