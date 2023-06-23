interface User {
    name: string,
    email: string,
    image: string,
    id: string
}

interface Chat {
    id: string,
    messages: Message[],
}

interface Message {
    id: string,
    senderId: string,
    recieverId: string,
    text: string,
    timestamp: number
}

interface FreiendRequest {
    id: string,
    senderId: string,
    recieverId: string,
}