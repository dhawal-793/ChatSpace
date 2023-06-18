import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { fetchRedis } from "../add/helpers/redis"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { id: idToAdd } = z.object({ id: z.string() }).parse(body)
        const session = await getServerSession(authOptions)
        if (!session) return new Response("Unauthorized", { status: 401 })

        const isAlreadyFriend = await await fetchRedis('sismember', `user:${session.user.id}:friends`,idToAdd)
        if (isAlreadyFriend) return new Response("Already friends", { status: 400 })

        const hasFriendRequest = await fetchRedis('sismember', `user:${session.user.id}:incoming_friend_requests`, idToAdd)
        console.log("hasFriendRequest =>, ", hasFriendRequest);
        return new Response("ok")
    } catch (error) {

    }
}