export interface FaqItem {
  question: string
  answer: string
}

export const FAQ: readonly FaqItem[] = [
  {
    question: 'Do I need a website already?',
    answer:
      'No. Plenty of local businesses start from a social media page and word of mouth. If you do have a site that feels dated, I can rebuild it as a single clear page. Add your current web address to the form and I’ll take a look first.',
  },
  {
    question: 'What do I need to provide?',
    answer:
      'Your business name, the services you offer, the areas you serve, your contact details, and photos of your work. A logo or brand colours help but aren’t required.',
  },
  {
    question: 'Can I add more pages or features later?',
    answer:
      'Yes. Tell me what you have in mind and I’ll include it in your quote as a separate line, so you can decide with the full picture.',
  },
  {
    question: 'Are hosting and a domain included?',
    answer:
      'That depends on what you already have, so it’s written into your quote. If you own a domain name, mention it in your message.',
  },
  {
    question: 'How long will it take?',
    answer:
      'Mostly it depends on how quickly your photos and details are ready. I’ll give you a schedule with your quote rather than guess up front.',
  },
]
