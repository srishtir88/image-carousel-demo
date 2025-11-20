import express from 'express';
import path from 'path';
const app = express();
const PORT = 3000;
app.use(express.static(path.join(process.cwd(), 'public')));
const carouselData = [
  { id: 1, title: "Slide 1", description: "This is the first slide", imageUrl: "/images/slide1.jpg", altText: "First slide image" },
  { id: 2, title: "Slide 2", description: "This is the second slide", imageUrl: "/images/slide2.jpg", altText: "Second slide image" },
  { id: 3, title: "Slide 3", description: "This is the third slide", imageUrl: "/images/slide3.jpg", altText: "Third slide image" }
];
app.get('/api/carousel', (req, res) => res.json(carouselData));
app.get('/', (req, res) => res.sendFile(path.join(process.cwd(), 'public/index.html')));
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
