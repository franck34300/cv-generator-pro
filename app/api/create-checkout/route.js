import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { cvData, templateId } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'CV Premium - Accès tous templates',
              description: '1 export PDF sans watermark · Tous les templates disponibles',
            },
            unit_amount: 78, // 78 centimes = 78 en centimes Stripe
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/editor?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/editor?payment=cancelled`,
      metadata: {
        templateId,
        cvDataPrenom: cvData.firstName || '',
        cvDataNom: cvData.lastName || '',
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    );
  }
}
