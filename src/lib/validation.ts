/**
 * Validation utilities for admin forms
 */

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates a product form
 */
export const validateProduct = (data: {
  name: string;
  description?: string;
  category_id?: string;
  images?: string[];
  youtube_url?: string;
  pdf_url?: string;
  whatsapp_message?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Product name is required";
  } else if (data.name.trim().length < 3) {
    errors.name = "Product name must be at least 3 characters";
  } else if (data.name.trim().length > 200) {
    errors.name = "Product name must be less than 200 characters";
  }

  // Description validation
  if (data.description && data.description.length > 2000) {
    errors.description = "Description must be less than 2000 characters";
  }

  // YouTube URL validation
  if (data.youtube_url && data.youtube_url.trim().length > 0) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(data.youtube_url)) {
      errors.youtube_url = "Please enter a valid YouTube URL";
    }
  }

  // PDF URL validation
  if (data.pdf_url && data.pdf_url.trim().length > 0) {
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(data.pdf_url)) {
      errors.pdf_url = "Please enter a valid URL";
    }
  }

  // WhatsApp message validation
  if (data.whatsapp_message && data.whatsapp_message.length > 500) {
    errors.whatsapp_message = "WhatsApp message must be less than 500 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a gallery image form
 */
export const validateGallery = (data: {
  image_url: string;
  title?: string;
  description?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  // Image URL validation
  if (!data.image_url || data.image_url.trim().length === 0) {
    errors.image_url = "Image is required";
  } else {
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(data.image_url)) {
      errors.image_url = "Please upload a valid image";
    }
  }

  // Title validation
  if (data.title && data.title.length > 200) {
    errors.title = "Title must be less than 200 characters";
  }

  // Description validation
  if (data.description && data.description.length > 1000) {
    errors.description = "Description must be less than 1000 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a blog post form
 */
export const validateBlogPost = (data: {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  // Title validation
  if (!data.title || data.title.trim().length === 0) {
    errors.title = "Title is required";
  } else if (data.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (data.title.trim().length > 200) {
    errors.title = "Title must be less than 200 characters";
  }

  // Slug validation
  if (!data.slug || data.slug.trim().length === 0) {
    errors.slug = "Slug is required";
  } else {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(data.slug)) {
      errors.slug = "Slug must contain only lowercase letters, numbers, and hyphens";
    }
  }

  // Content validation
  if (!data.content || data.content.trim().length === 0) {
    errors.content = "Content is required";
  } else if (data.content.trim().length < 50) {
    errors.content = "Content must be at least 50 characters";
  }

  // Excerpt validation
  if (data.excerpt && data.excerpt.length > 500) {
    errors.excerpt = "Excerpt must be less than 500 characters";
  }

  // Cover image validation
  if (data.cover_image && data.cover_image.trim().length > 0) {
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(data.cover_image)) {
      errors.cover_image = "Please enter a valid image URL";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a service form
 */
export const validateService = (data: {
  title: string;
  description?: string;
  icon?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  // Title validation
  if (!data.title || data.title.trim().length === 0) {
    errors.title = "Service title is required";
  } else if (data.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (data.title.trim().length > 200) {
    errors.title = "Title must be less than 200 characters";
  }

  // Description validation
  if (data.description && data.description.length > 2000) {
    errors.description = "Description must be less than 2000 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a testimonial form
 */
export const validateTestimonial = (data: {
  name: string;
  content: string;
  company?: string;
  rating?: number;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name must be less than 100 characters";
  }

  // Content validation
  if (!data.content || data.content.trim().length === 0) {
    errors.content = "Testimonial content is required";
  } else if (data.content.trim().length < 10) {
    errors.content = "Content must be at least 10 characters";
  } else if (data.content.trim().length > 1000) {
    errors.content = "Content must be less than 1000 characters";
  }

  // Company validation
  if (data.company && data.company.length > 100) {
    errors.company = "Company name must be less than 100 characters";
  }

  // Rating validation
  if (data.rating !== undefined) {
    if (data.rating < 1 || data.rating > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a FAQ form
 */
export const validateFAQ = (data: {
  question: string;
  answer: string;
  display_order?: number;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  // Question validation
  if (!data.question || data.question.trim().length === 0) {
    errors.question = "Question is required";
  } else if (data.question.trim().length < 5) {
    errors.question = "Question must be at least 5 characters";
  } else if (data.question.trim().length > 500) {
    errors.question = "Question must be less than 500 characters";
  }

  // Answer validation
  if (!data.answer || data.answer.trim().length === 0) {
    errors.answer = "Answer is required";
  } else if (data.answer.trim().length < 10) {
    errors.answer = "Answer must be at least 10 characters";
  } else if (data.answer.trim().length > 2000) {
    errors.answer = "Answer must be less than 2000 characters";
  }

  // Display order validation
  if (data.display_order !== undefined && data.display_order < 0) {
    errors.display_order = "Display order must be 0 or greater";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates a category form
 */
export const validateCategory = (data: {
  name: string;
  description?: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Category name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Category name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Category name must be less than 100 characters";
  }

  // Description validation
  if (data.description && data.description.length > 500) {
    errors.description = "Description must be less than 500 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
