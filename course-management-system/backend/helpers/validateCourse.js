// backend/helpers/validateCourse.js

function validateCourse(data) {
    const errors = {};

    // =========================
    // TRIM STRING VALUES
    // =========================

    const title = String(data.title ?? "").trim();
    const category = String(data.category ?? "").trim();
    const level = String(data.level ?? "").trim();
    const duration = String(data.duration ?? "").trim();
    const image = String(data.image ?? "").trim();
    const description = String(data.description ?? "").trim();

    // =========================
    // TITLE VALIDATION
    // =========================

    if (!title) {
        errors.title = "Title is required";
    } else if (title.length < 3) {
        errors.title =
            "Title must contain at least 3 characters";
    } else if (title.length > 100) {
        errors.title =
            "Title must not exceed 100 characters";
    }

    // =========================
    // CATEGORY VALIDATION
    // =========================

    if (!category) {
        errors.category = "Category is required";
    } else if (category.length < 2) {
        errors.category =
            "Category must contain at least 2 characters";
    } else if (category.length > 50) {
        errors.category =
            "Category must not exceed 50 characters";
    }

    // =========================
    // LEVEL VALIDATION
    // =========================

    const validLevels = [
        "Beginner",
        "Intermediate",
        "Advanced"
    ];

    if (!level) {
        errors.level = "Level is required";
    } else if (!validLevels.includes(level)) {
        errors.level =
            "Level must be Beginner, Intermediate, or Advanced";
    }

    // =========================
    // DURATION VALIDATION
    // =========================

    const durationPattern =
        /^[1-9]\d*\s+(Days|Weeks|Months)$/;

    if (!duration) {
        errors.duration = "Duration is required";
    } else if (!durationPattern.test(duration)) {
        errors.duration =
            "Duration must be a positive number followed by Days, Weeks, or Months";
    }

    // =========================
    // PRICE VALIDATION
    // =========================

    if (
        data.price === undefined ||
        data.price === null ||
        data.price === ""
    ) {
        errors.price = "Price is required";
    } else {
        const priceString = String(data.price).trim();
        const price = Number(priceString);

        if (Number.isNaN(price)) {
            errors.price = "Price must be numeric";
        } else if (price < 0) {
            errors.price = "Price cannot be negative";
        } else if (price > 1000000) {
            errors.price =
                "Price cannot exceed 1000000";
        } else if (
            !/^\d+(\.\d{1,2})?$/.test(priceString)
        ) {
            errors.price =
                "Price cannot contain more than two decimal places";
        }
    }

    // =========================
    // IMAGE VALIDATION
    // =========================

    if (image) {
        if (image.length > 500) {
            errors.image =
                "Image URL must not exceed 500 characters";
        } else {
            try {
                const url = new URL(image);

                if (
                    url.protocol !== "http:" &&
                    url.protocol !== "https:"
                ) {
                    errors.image =
                        "Image must be a valid HTTP or HTTPS URL";
                }
            } catch (error) {
                errors.image =
                    "Image must be a valid HTTP or HTTPS URL";
            }
        }
    }

    // =========================
    // DESCRIPTION VALIDATION
    // =========================

    if (description.length > 1000) {
        errors.description =
            "Description must not exceed 1000 characters";
    }

    // =========================
    // CLEANED DATA
    // =========================

    const cleanedData = {
        title,
        category,
        level,
        duration,
        price:
            data.price === "" ||
            data.price === null ||
            data.price === undefined
                ? null
                : Number(data.price),
        image,
        description
    };

    return {
        errors,
        cleanedData
    };
}

module.exports = validateCourse;