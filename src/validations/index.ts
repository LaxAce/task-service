import z from "zod";
import { validate } from "../utils/auth";

export const validateCreateUser = validate({
    body: z.object({
        email: z.email("Invalid email"),
        lastName: z.string("Last name must be a string").optional(),
        firstName: z.string("First name must be a string").optional(),
        password: z
            .string("Password is required")
            .min(6, 'Password most be at least 6 characters')
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d).+$/,
                "Password must contain at least one letter and one number"
            ),
    })
})

export const validateVerifyEmail = validate({
    body: z.object({
        id: z.uuid("Invalid verification id"),
        unique_id: z.string("Invalid verification token")
    })
})

export const validateForgotPassword = validate({
    body: z.object({
        email: z.email("Invalid email"),
    })
})

export const validateVerifyForgotPassword = validate({
    body: z.object({
        id: z.uuid("Invalid verification id"),
        unique_id: z.string("Invalid verification token"),
        password: z.string("Password is required").min(6, 'Password most be at least 6 characters'),
    })
})

export const validateLogin = validate({
    body: z.object({
        email: z.email("Invalid email"),
        password: z.string("Password is required").min(6, 'Password most be at least 6 characters'),
    })
})




export const validateCreateBoard = validate({
    body: z.object({
        name: z.string("Board name has to be a string").min(3, "Board name must be at least 3 characters"),
        columns: z.array(z.string("Columns can only be a list of strings")).optional()
    })
})

export const validateBoardId = validate({
    params: z.object({
        board_id: z.uuid("Invalid board id")
    })
})

export const validateUpdateBoard = validate({
    body: z.object({
        name: z.string("Board name has to be a string").min(3, "Board name must be at least 3 characters"),
        columns: z.array(z.object({
            id: z.uuid("Invalid uuid").optional(),
            name: z.string("Column name must be a string"),
            isEditing: z.boolean("isEditing must be a boolean"),
            isDeleting: z.boolean("isDeleting must be a boolean"),
        })).optional()
    })
})

export const validateCreateColumn = validate({
    body: z.object({
        name: z.string("Column name has to be a string")
    })
})

export const validateTaskId = validate({
    params: z.object({
        task_id: z.uuid("Invalid task id")
    })
})

export const validateUpdateTask = validate({
    body: z.object({
        title: z.string("Task title has to be a string").min(3, "Task title must be at least 3 characters"),
        description: z.string("Description must be a string").optional(),
        boardColumnId: z.uuid("Invalid column id"),
        subTasks: z.array(z.object({
            id: z.uuid("Invalid uuid").optional(),
            title: z.string("Task title must be a string"),
            isEditing: z.boolean("isEditing must be a boolean"),
            isDeleting: z.boolean("isDeleting must be a boolean"),
        })).optional()
    })
})

export const validateCreateTask = validate({
    body: z.object({
        title: z.string("Task title has to be a string").min(3, "Task title must be at least 3 characters"),
        description: z.string("Description must be a string").optional(),
        boardColumnId: z.uuid("Invalid column id"),
        subTasks: z.array(z.object({
            title: z.string("Subtask title must be a string"),
            isCompleted: z.boolean("isCompleted must be a boolean").optional(),
        })).optional(),
    }),
})

export const validateUpdateSubTask = validate({
    params: z.object({
        id: z.uuid("Invalid subtask id"),
    }),
    body: z.object({
        title: z.string("Subtask title must be a string").min(1, "Subtask title cannot be empty").optional(),
        isCompleted: z.boolean("isCompleted must be a boolean").optional(),
    }).refine((data) => data.title !== undefined || data.isCompleted !== undefined,
        {
            message: "At least one field (title or isCompleted) must be provided",
        }
    ),
})
