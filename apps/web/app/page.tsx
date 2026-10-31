'use client';

import { useEffect, useState } from 'react';

type Meal = {
  id: string;
  name: string;
  description: string;
  allergens: string[];
  nutritionPerServing: { caloriesKcal: number; proteinG: number; carbohydratesG: number; fatG: number; sodiumMg: number };
  notice: string;
};

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [status, setStatus] = useState('Connecting to pilot API…');
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API}/v1/menu`)
      .then(r => { if (!r.ok) throw new Error('API unavailable'); return r.json(); })
      .then(data => { setMeals(data.items); setStatus('Pilot catalogue connected'); })
      .catch(() => setStatus('API unavailable — start the backend to load meals.'));
  }, []);

  function toggle(id: string) {
    setSelected(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  }

  async function createDemoOrder() {
    if (!selected.length) { setMessage('Select at least one meal.'); return; }
    const totalCents = selected.reduce((sum, id) => {
      const index = meals.findIndex(m => m.id === id);
      return sum + (index === 0 ? 1299 : 1099);
    }, 0);
    try {
      const response = await fetch(`${API}/v1/orders`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ customerReference: 'SYNTHETIC-DEMO-CUSTOMER', itemIds: selected, totalCents })
      });
      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error ?? 'Order could not be created');
      setMessage(`Demo order created: ${data.order.id}. No payment was taken.`);
      setSelected([]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Order failed.');
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="/">healthy<span>food</span></a>
        <span className="pilot">PILOT EXPERIENCE</span>
      </header>
      <section className="hero">
        <div className="eyebrow">NOURISHMENT WITH A PLAN</div>
        <h1>Meals made with<br /><em>care in every detail.</em></h1>
        <p>Explore a sample menu designed to demonstrate the HealthyFood medically tailored meal experience.</p>
        <div className="status"><i />{status}</div>
      </section>
      <section className="notice">
        <strong>Demonstration environment</strong>
        <p>Meals and nutrition values are illustrative, not clinically verified. This pilot does not provide medical advice, determine dietary suitability, or process payments.</p>
      </section>
      <section className="menu">
        <div className="section-heading">
          <div><div className="eyebrow">THE SAMPLE MENU</div><h2>Thoughtful, simple food.</h2></div>
          <span className="count">{meals.length} meals</span>
        </div>
        <div className="cards">
          {meals.map((meal, index) => (
            <article className="meal" key={meal.id}>
              <div className={`meal-art art-${index + 1}`}><span>{index === 0 ? '01' : '02'}</span></div>
              <div className="meal-body">
                <div className="meal-meta">SAMPLE MEAL · {meal.nutritionPerServing.caloriesKcal} KCAL</div>
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
                <div className="nutrition">
                  <span><b>{meal.nutritionPerServing.proteinG}g</b> protein</span>
                  <span><b>{meal.nutritionPerServing.carbohydratesG}g</b> carbs</span>
                  <span><b>{meal.nutritionPerServing.sodiumMg}mg</b> sodium</span>
                </div>
                <p className="allergens">Allergens: {meal.allergens.length ? meal.allergens.join(', ') : 'None declared in sample data'}</p>
                <button className={selected.includes(meal.id) ? 'selected' : ''} onClick={() => toggle(meal.id)}>
                  {selected.includes(meal.id) ? 'Added to demo order ✓' : 'Add to demo order'}
                </button>
                <small>{meal.notice}</small>
              </div>
            </article>
          ))}
        </div>
        <div className="orderbar">
          <div><strong>{selected.length} selected</strong><span>Demo checkout · no payment</span></div>
          <button disabled={!selected.length} onClick={createDemoOrder}>Create demo order</button>
        </div>
        {message && <p className="message" role="status">{message}</p>}
      </section>
      <footer><span>healthyfood</span><span>Built for a safer, more connected meal experience.</span></footer>
    </main>
  );
}
