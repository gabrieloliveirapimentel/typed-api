import z from "zod";
import { FastifyTypedInstance, User } from "../@types";
import { randomUUID } from "node:crypto";

const users: User[] = [
    {
        "id": "05583a8e-c44d-4106-863a-af9e1f79f3ad",
        "name": "Gabriel Pimentel",
        "email": "gabriel.pimentel@cefetmg.br"
    }
]

export async function routes(app: FastifyTypedInstance) {
    app.get('/', {
        schema: {
            tags: ['default'],
            description: 'Check if the server is running',
        }
    }, () => {
        return "Server is running!"
    })

    app.get('/users/:id', {
        schema: {
            tags: ['users'],
            description: 'Get user by ID',
            params: z.object({
                id: z.string().uuid(),
            }),
            response: {
                200: z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string(),
                }).describe('User details'),
                201: z.null().describe('User created successfully'),
                404: z.null().describe('User not found'),
            }
        }
    }, (request, reply) => {
        const { id } = request.params
        
        const user = users.find(user => user.id === id)

        if (!user) {
            reply.status(404).send();
            return;
        }

        return user
    })
    
    app.get('/users', {
        schema: {
            tags: ['users'],
            description: 'List all users',
            response: {
                200: z.array(z.object({
                    id: z.string(),
                    name: z.string(),
                    email: z.string(),
                })).describe('List of users'),
            }
        },
        
    }, () => {
        return users
    })

    app.post('/users', {
        schema: {
            tags: ['users'],
            description: 'Create a new user',
            body: z.object({
                name: z.string(),
                email: z.string().email(),
            }),
            response: {
                201: z.null().describe('User created successfully'),
            }
        }
    }, async (request, reply) => {
        const { name, email } = request.body

        users.push({
            id: randomUUID(),
            name,
            email
        })

        return reply.status(201).send()
    })

    app.put('/users/:id', {
        schema: {
            tags: ['users'],
            description: 'Update user by ID',
            params: z.object({
                id: z.string().uuid(),
            }),
            body: z.object({
                name: z.string(),
                email: z.string().email(),
            }),
            response: {
                200: z.null().describe('User updated successfully'),
                404: z.null().describe('User not found'),
            }
        }
    }, async (request, reply) => {
        const { id } = request.params
        const { name, email } = request.body

        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex === -1) {
            reply.status(404).send();
            return;
        }

        users[userIndex] = {
            ...users[userIndex],
            name,
            email
        }

        return reply.status(200).send()
    })

    app.delete('/users/:id', {
        schema: {
            tags: ['users'],
            description: 'Delete user by ID',
            params: z.object({
                id: z.string().uuid(),
            }),
            response: {
                200: z.null().describe('User deleted successfully'),
                404: z.null().describe('User not found'),
            }
        }
    }, async (request, reply) => {
        const { id } = request.params

        const userIndex = users.findIndex(user => user.id === id)

        if (userIndex === -1) {
            reply.status(404).send();
            return;
        }

        users.splice(userIndex, 1)

        return reply.status(200).send()
    })
}