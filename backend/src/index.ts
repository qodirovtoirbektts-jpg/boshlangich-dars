import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Barbershop API is running' });
});

// Get all active services
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { is_active: true }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all active barbers
app.get('/api/barbers', async (req, res) => {
  try {
    const barbers = await prisma.barber.findMany({
      where: { status: 'active' },
      include: { workingHours: true }
    });
    res.json(barbers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { client_name, client_phone, barber_id, service_id, date, start_time, end_time } = req.body;
    
    // In a real scenario, here we'd check for double bookings and validate the slot

    const booking = await prisma.booking.create({
      data: {
        client_name,
        client_phone,
        barber_id,
        service_id,
        date: new Date(date),
        start_time,
        end_time,
        status: 'pending'
      }
    });
    
    // Here we would also send a Telegram message via bot API
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
