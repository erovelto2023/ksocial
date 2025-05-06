import { NextResponse } from "next/server"
import { hash } from "bcryptjs"

// This is a mock implementation that doesn't actually store the user
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Mock check if user already exists
    const existingUser = false // In a real app, you'd check your database

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Mock user creation
    const user = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role: "user",
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ message: "User created successfully", user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
