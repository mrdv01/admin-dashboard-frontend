# Blog Management System

A full-stack blog management system built with Next.js, Supabase.

## Features

- 📝 Create, edit, and delete blog posts
- 📊 Dashboard with blog statistics
- 📱 Responsive design
- 🎨 modern ui

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

- Node.js 18.17 or later
- npm or pnpm
- Supabase account
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/admin-dashboard-frontend
cd admin-dashboard-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

Run the following SQL script in your Supabase SQL editor:

```sql
-- Create blogs table
CREATE TABLE blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    author_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create RLS policies
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy for viewing published posts (public)
CREATE POLICY "Public blogs are viewable by everyone" ON blogs
    FOR SELECT
    USING (status = 'published');

-- Policy for authors to manage their own posts
CREATE POLICY "Users can manage their own blogs" ON blogs
    FOR ALL
    USING (auth.uid() = author_id);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamp
CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 5. Install Required shadcn/ui Components

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea alert dialog sheet table toast
```

### 6. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Key Features Implementation



### Blog Management

- CRUD operations for blog posts
- Draft/Published status
- text editor
- Image upload support
- Pagination

### Dashboard

- Blog statistics overview


## Deployment

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Add environment variables
4. Deploy!

## Screenshots

![image](https://github.com/user-attachments/assets/65c2fe6c-1056-4011-9596-e691c69545d4)

*Dashboard View*

![image](https://github.com/user-attachments/assets/ef15429c-6ed8-4135-bf32-82d81494b3fb)

*Blog Editor Interface*

![image](https://github.com/user-attachments/assets/9bd0f8ed-9c94-4641-9c1e-787045b80369)

*Blog Posts List*

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

