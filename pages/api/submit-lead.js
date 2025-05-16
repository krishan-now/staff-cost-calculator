export default async function handler(req, res) {
  const { name, email, company, jobs, timestamp } = req.body;
  console.log('Lead submitted:', { name, email, company, jobs, timestamp });

  // Optional: Send to Zapier/CRM
  return res.status(200).json({ success: true });
}
