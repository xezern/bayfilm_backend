const { z } = require("zod")

const landingSchema = z.object({
    payment: z.nullable(),
    tiktok: z.nullable(),
    instagram: z.nullable(),
    number: z.string()
        .min(3, { message: 'Number must be at least 3 characters long' })
        .max(50, { message: 'Number must be less than 50 characters' })
        .trim()
        .nonempty({ message: 'Number is required' }),
    mail: z.string()
        .min(3, { message: 'Mail must be at least 3 characters long' })
        .trim()
        .email()
        .nonempty({ message: 'Mail is required' }),
    location: z.string()
        .min(3, { message: 'Location must be at least 3 characters long' })
        .max(255, { message: 'Location must be less than 255 characters' })
        .trim()
        .nonempty({ message: 'Location is required' }),
    about_image: z.string()
        .trim()
        .nonempty({ message: 'About image is required' }),
    description: z.string()
        .min(3, { message: 'Description must be at least 3 characters long' })
        .max(10000, { message: 'Description must be less than 10.000 characters' })
        .trim()
        .nonempty({ message: 'Description is required' }),
    label: z.string()
        .min(3, { message: 'Label must be at least 3 characters long' })
        .max(255, { message: 'Label must be less than 255 characters' })
        .trim()
        .nonempty({ message: 'Label is required' }),
    title: z.string()
        .min(3, { message: 'Title must be at least 3 characters long' })
        .max(255, { message: 'Title must be less than 50 characters' })
        .trim()
        .nonempty({ message: 'Title is required' }),
    grid_images: z.string()
        .min(3, { message: 'Grid image must be at least 3 characters long' })
        .max(10000, { message: 'Grid image must be less than 10.000 characters' })
        .trim()
        .nonempty({ message: 'Grid image is required' }),
    header_img: z.string()
        .min(3, { message: 'Header image must be at least 3 characters long' })
        .max(10000, { message: 'Header image must be less than 10.000 characters' })
        .trim()
        .nonempty({ message: 'Header image is required' }),
});

module.exports = { landingSchema }