# FlexShoes - Premium Online Shoe Store

A stunning, modern e-commerce website for FlexShoes,
featuring an elegant design with vibrant colors,
smooth animations, 
and a comprehensive shopping experience.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Modern icon library
- **Next.js Fonts** - Optimized font loading

## ✨ Features

### 🎨 Design & UI
- **Vibrant Color Scheme** - Red and yellow brand colors with elegant typography
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Engaging hover effects and transitions
- **Modern Typography** - Space Grotesk and DM Sans fonts

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse all shoes with filtering and sorting
- **Individual Product Pages** - Detailed product views with galleries
- **Category Navigation** - Easy browsing by shoe categories
- **Search Functionality** - Find products quickly
- **Shopping Cart** - Add to cart functionality (UI ready)

### 📱 User Experience
- **Hero Section** - Stunning background with call-to-action buttons
- **Featured Products** - Highlighted bestsellers on homepage
- **Customer Testimonials** - Social proof with rotating reviews
- **Newsletter Signup** - Email subscription for updates
- **Sticky Navigation** - Always accessible menu

## 🏗️ Project Structure

\`\`\`
flexshoes-website/
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage
│   └── products/
│       ├── page.tsx         # Products catalog page
│       └── [id]/
│           └── page.tsx     # Individual product pages
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── navigation.tsx       # Header navigation
│   ├── hero-section.tsx     # Hero banner
│   ├── featured-products.tsx # Homepage featured products
│   ├── categories-section.tsx # Product categories
│   ├── testimonials-section.tsx # Customer reviews
│   └── footer.tsx           # Site footer
├── lib/
│   ├── utils.ts             # Utility functions
│   └── products.ts          # Product data and types
└── public/
└── images/              # Product images and assets
\`\`\`

## 🛠️ Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd flexshoes-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 Pages & Routes

- **`/`** - Homepage with hero, featured products, categories, and testimonials
- **`/products`** - Complete product catalog with filtering
- **`/products/[id]`** - Individual product detail pages

## 🎨 Design System

### Colors
- **Primary Red**: `#DC2626` - Main brand color
- **Secondary Yellow**: `#F59E0B` - Accent color
- **Neutrals**: Various grays for text and backgrounds

### Typography
- **Headings**: Space Grotesk (600, 700 weights)
- **Body Text**: DM Sans (400, 500 weights)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 🔧 Customization

### Adding New Products
Edit `lib/products.ts` to add new products with:
- Product details (name, price, description)
- Image galleries
- Available sizes and colors
- Features and specifications

### Styling Changes
- Global styles: `app/globals.css`
- Component styles: Individual component files
- Design tokens: CSS custom properties in globals.css

## 📱 Performance Features

- **Optimized Images** - Next.js Image component with lazy loading
- **Font Optimization** - Next.js font loading with display swap
- **Code Splitting** - Automatic route-based code splitting
- **Responsive Images** - Multiple image sizes for different devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first styling approach
- **Next.js** team for the amazing React framework
- **Vercel** for seamless deployment platform

---

Built with ❤️ for FlexShoes - Step into Style, Step into Comfort
