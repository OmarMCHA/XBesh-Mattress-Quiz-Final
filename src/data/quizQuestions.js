export const quizQuestions = [
  {
    id: 'sleepPosition',
    question: 'What is your primary sleeping position?',
    description: 'Your sleeping position significantly impacts which mattress firmness will provide optimal spinal alignment and comfort.',
    options: [
      {
        id: 'side',
        label: 'Side Sleeper',
        description: 'You primarily sleep on your side',
        image: '/images/side-sleeper.svg'
      },
      {
        id: 'back',
        label: 'Back Sleeper',
        description: 'You primarily sleep on your back',
        image: '/images/back-sleeper.svg'
      },
      {
        id: 'stomach',
        label: 'Stomach Sleeper',
        description: 'You primarily sleep on your stomach',
        image: '/images/stomach-sleeper.svg'
      },
      {
        id: 'combination',
        label: 'Combination Sleeper',
        description: 'You change positions throughout the night',
        image: '/images/combination-sleeper.svg'
      }
    ],
    scientificNote: 'Research shows that side sleepers typically need softer mattresses to relieve pressure on shoulders and hips, while back and stomach sleepers benefit from firmer support to maintain spinal alignment.'
  },
  {
    id: 'weight',
    question: 'What is your body weight?',
    description: 'Your body weight affects how deeply you sink into a mattress, which influences the level of support you need.',
    options: [
      {
        id: 'light',
        label: 'Lightweight',
        description: 'Under 130 lbs (59 kg)',
        image: '/images/light-weight.svg'
      },
      {
        id: 'average',
        label: 'Average Weight',
        description: '130-230 lbs (59-104 kg)',
        image: '/images/average-weight.svg'
      },
      {
        id: 'heavy',
        label: 'Heavyweight',
        description: 'Over 230 lbs (104 kg)',
        image: '/images/heavy-weight.svg'
      }
    ],
    scientificNote: 'Heavier individuals (>230 lbs) typically require firmer mattresses with enhanced support to prevent excessive sinking, while lighter individuals (<130 lbs) often find medium to soft mattresses more comfortable as they don\'t exert enough pressure to fully engage with firmer surfaces.'
  },
  {
    id: 'bodyType',
    question: 'What is your body type?',
    description: 'Your body shape affects how weight is distributed across the mattress and which areas need additional support.',
    options: [
      {
        id: 'average',
        label: 'Average',
        description: 'Your weight is evenly distributed',
        image: '/images/average-body.svg'
      },
      {
        id: 'broadShoulders',
        label: 'Broad Shoulders',
        description: 'Your shoulders are wider than your hips',
        image: '/images/broad-shoulders.svg'
      },
      {
        id: 'wideHips',
        label: 'Wide Hips',
        description: 'Your hips are wider than your shoulders',
        image: '/images/wide-hips.svg'
      },
      {
        id: 'evenlyDistributed',
        label: 'Evenly Distributed',
        description: 'Your weight is proportionally distributed',
        image: '/images/evenly-distributed.svg'
      }
    ],
    scientificNote: 'Body shape affects pressure distribution. Those with broader shoulders or wider hips often need mattresses with targeted pressure relief in those areas to maintain proper spinal alignment and prevent discomfort.'
  },
  {
    id: 'painPoints',
    question: 'Where do you experience pain, if any?',
    description: 'Identifying specific pain points helps determine which mattress features might provide relief.',
    options: [
      {
        id: 'none',
        label: 'No Pain Issues',
        description: 'You don\'t experience specific pain while sleeping',
        image: '/images/no-pain.svg'
      },
      {
        id: 'shoulderHip',
        label: 'Shoulder/Hip Pain',
        description: 'Pain or discomfort in your shoulders or hips',
        image: '/images/shoulder-hip-pain.svg'
      },
      {
        id: 'lowerBack',
        label: 'Lower Back Pain',
        description: 'Pain or discomfort in your lower back',
        image: '/images/lower-back-pain.svg'
      },
      {
        id: 'neck',
        label: 'Neck Pain',
        description: 'Pain or discomfort in your neck',
        image: '/images/neck-pain.svg'
      }
    ],
    multiSelect: true,
    scientificNote: 'Clinical studies indicate that medium-firm mattresses often provide optimal support for back pain sufferers, while pressure-relieving materials like memory foam can help alleviate joint pain in shoulders and hips.'
  },
  {
    id: 'medicalConditions',
    question: 'Do you have any of the following medical conditions?',
    description: 'Certain medical conditions require specific mattress features for optimal comfort and symptom management.',
    options: [
      {
        id: 'none',
        label: 'None',
        description: 'No specific medical conditions to consider',
        image: '/images/no-conditions.svg'
      },
      {
        id: 'chronicPain',
        label: 'Fibromyalgia/Chronic Pain',
        description: 'Widespread pain and heightened pain sensitivity',
        image: '/images/chronic-pain.svg'
      },
      {
        id: 'arthritis',
        label: 'Arthritis',
        description: 'Joint inflammation and stiffness',
        image: '/images/arthritis.svg'
      },
      {
        id: 'scoliosis',
        label: 'Scoliosis',
        description: 'Abnormal curvature of the spine',
        image: '/images/scoliosis.svg'
      },
      {
        id: 'sleepApnea',
        label: 'Sleep Apnea/GERD',
        description: 'Breathing interruptions during sleep or acid reflux',
        image: '/images/sleep-apnea.svg'
      }
    ],
    multiSelect: true,
    scientificNote: 'Research shows that individuals with chronic pain conditions often benefit from pressure-relieving mattresses, while those with sleep apnea or GERD may find relief with adjustable beds that allow elevation of the upper body.'
  },
  {
    id: 'temperature',
    question: 'How would you describe your temperature while sleeping?',
    description: 'Your body temperature during sleep affects which mattress materials will provide the most comfortable sleep environment.',
    options: [
      {
        id: 'hot',
        label: 'Hot Sleeper',
        description: 'You often feel too warm or sweat during sleep',
        image: '/images/hot-sleeper.svg'
      },
      {
        id: 'cold',
        label: 'Cold Sleeper',
        description: 'You often feel cold during sleep',
        image: '/images/cold-sleeper.svg'
      },
      {
        id: 'neutral',
        label: 'Neutral',
        description: 'Your temperature is generally comfortable during sleep',
        image: '/images/neutral-temp.svg'
      }
    ],
    scientificNote: 'Mattress materials significantly impact sleep temperature. Foam mattresses, especially traditional memory foam, tend to retain heat, while innerspring and hybrid mattresses typically offer better airflow and cooling properties.'
  },
  {
    id: 'bedSharing',
    question: 'Do you share your bed?',
    description: 'Sharing a bed affects mattress requirements, especially regarding motion isolation and edge support.',
    options: [
      {
        id: 'no',
        label: 'No',
        description: 'You sleep alone',
        image: '/images/sleep-alone.svg'
      },
      {
        id: 'yes',
        label: 'Yes',
        description: 'You share with a partner with similar preferences',
        image: '/images/share-bed.svg'
      },
      {
        id: 'yesDifferent',
        label: 'Yes, with different needs',
        description: 'You share with a partner who has different sleep preferences',
        image: '/images/different-needs.svg'
      }
    ],
    scientificNote: 'Couples often benefit from mattresses with excellent motion isolation to prevent sleep disturbances. When partners have different preferences, split firmness options or mattresses with localized support zones can be beneficial.'
  },
  {
    id: 'partnerMovement',
    question: 'How sensitive are you to a partner\'s movement in bed?',
    description: 'Your sensitivity to movement helps determine how important motion isolation is for your mattress.',
    options: [
      {
        id: 'very',
        label: 'Very Sensitive',
        description: 'Partner movement frequently disturbs your sleep',
        image: '/images/very-sensitive.svg'
      },
      {
        id: 'somewhat',
        label: 'Somewhat Sensitive',
        description: 'Partner movement occasionally disturbs your sleep',
        image: '/images/somewhat-sensitive.svg'
      },
      {
        id: 'not',
        label: 'Not Sensitive',
        description: 'Partner movement rarely or never disturbs your sleep',
        image: '/images/not-sensitive.svg'
      },
      {
        id: 'na',
        label: 'Not Applicable',
        description: 'You sleep alone',
        image: '/images/sleep-alone.svg'
      }
    ],
    scientificNote: 'Memory foam mattresses typically excel at motion isolation, absorbing movement rather than transferring it across the bed. This makes them ideal for couples, especially when one partner is a light sleeper or has different sleep schedules.'
  },
  {
    id: 'budget',
    question: 'What is your budget?',
    description: 'Your budget will help narrow down mattress options that offer the best value for your specific needs.',
    options: [
      {
        id: 'under500',
        label: 'Under $500',
        description: 'Budget-friendly options',
        image: '/images/budget-low.svg'
      },
      {
        id: '500to1000',
        label: '$500 - $1000',
        description: 'Mid-range options',
        image: '/images/budget-mid-low.svg'
      },
      {
        id: '1000to1500',
        label: '$1000 - $1500',
        description: 'Premium options',
        image: '/images/budget-mid.svg'
      },
      {
        id: '1500to2000',
        label: '$1500 - $2000',
        description: 'High-end options',
        image: '/images/budget-mid-high.svg'
      },
      {
        id: 'over2000',
        label: 'Over $2000',
        description: 'Luxury options',
        image: '/images/budget-high.svg'
      }
    ],
    scientificNote: 'Higher price doesn\'t always mean better quality or comfort. Many mid-range mattresses offer excellent support and durability, while budget options have improved significantly in recent years. The key is finding the right features for your specific needs.'
  },
  {
    id: 'durability',
    question: 'How long would you like your mattress to last?',
    description: 'Your durability expectations will influence material and construction recommendations.',
    options: [
      {
        id: '5to7',
        label: '5-7 years',
        description: 'Standard durability',
        image: '/images/durability-standard.svg'
      },
      {
        id: '7to10',
        label: '7-10 years',
        description: 'Extended durability',
        image: '/images/durability-extended.svg'
      },
      {
        id: '10plus',
        label: '10+ years',
        description: 'Maximum durability',
        image: '/images/durability-maximum.svg'
      }
    ],
    scientificNote: 'Mattress durability is primarily determined by material quality and density. Natural latex and high-density memory foam typically offer the longest lifespans, while lower-density foams and traditional innersprings may show signs of wear sooner.'
  },
  {
    id: 'mattressFeel',
    question: 'What is your preferred mattress feel?',
    description: 'Mattress feel refers to how the surface responds when you lie on it, which is distinct from firmness.',
    options: [
      {
        id: 'bouncy',
        label: 'Bouncy',
        description: 'Responsive with significant pushback',
        image: '/images/bouncy-feel.svg'
      },
      {
        id: 'sinking',
        label: 'Sinking',
        description: 'Contouring with a "hug" sensation',
        image: '/images/sinking-feel.svg'
      },
      {
        id: 'responsive',
        label: 'Responsive',
        description: 'Adapts quickly to movement',
        image: '/images/responsive-feel.svg'
      },
      {
        id: 'balanced',
        label: 'Balanced',
        description: 'Blend of contouring and support',
        image: '/images/balanced-feel.svg'
      }
    ],
    scientificNote: 'Mattress feel is subjective but has objective components. Innerspring and latex mattresses typically provide more bounce, while memory foam offers a sinking sensation. Hybrids aim to balance these qualities for a responsive yet contouring feel.'
  },
  {
    id: 'preferredFirmness',
    question: 'What firmness level do you prefer?',
    description: 'While our recommendations are based on sleep science, your personal firmness preference is also important.',
    options: [
      {
        id: 'soft',
        label: 'Soft',
        description: 'Plush with significant give',
        image: '/images/soft-feel.svg'
      },
      {
        id: 'medium',
        label: 'Medium',
        description: 'Balanced between soft and firm',
        image: '/images/medium-feel.svg'
      },
      {
        id: 'firm',
        label: 'Firm',
        description: 'Solid with minimal give',
        image: '/images/firm-feel.svg'
      }
    ],
    scientificNote: 'While personal preference is subjective, research suggests that medium-firm mattresses (5-7 on the firmness scale) provide the optimal balance of comfort and support for most sleepers, promoting proper spinal alignment while still offering pressure relief.'
  },
  {
    id: 'allergies',
    question: 'Do you have allergies or sensitivities?',
    description: 'Certain mattress materials may trigger allergic reactions or sensitivities in some individuals.',
    options: [
      {
        id: 'none',
        label: 'No allergies or sensitivities',
        description: 'No specific concerns',
        image: '/images/no-allergies.svg'
      },
      {
        id: 'dustMites',
        label: 'Dust mites',
        description: 'Allergic to dust mite allergens',
        image: '/images/dust-mites.svg'
      },
      {
        id: 'latex',
        label: 'Latex',
        description: 'Allergic to natural latex',
        image: '/images/latex-allergy.svg'
      },
      {
        id: 'chemicals',
        label: 'Chemical sensitivities',
        description: 'Sensitive to off-gassing or chemicals',
        image: '/images/chemical-sensitivity.svg'
      },
      {
        id: 'multiple',
        label: 'Multiple allergies',
        description: 'Several allergy concerns',
        image: '/images/multiple-allergies.svg'
      }
    ],
    multiSelect: true,
    scientificNote: 'Hypoallergenic mattresses can help reduce allergen exposure. Natural latex is resistant to dust mites but may cause reactions in those with latex allergies. Memory foam can off-gas VOCs initially, which may affect those with chemical sensitivities.'
  },
  {
    id: 'motionTransfer',
    question: 'How important is motion isolation to you?',
    description: 'Motion isolation prevents movement on one side of the bed from disturbing sleep on the other side.',
    options: [
      {
        id: 'notImportant',
        label: 'Not important',
        description: 'Motion transfer doesn\'t affect your sleep',
        image: '/images/motion-not-important.svg'
      },
      {
        id: 'somewhatImportant',
        label: 'Somewhat important',
        description: 'Some motion isolation is preferred',
        image: '/images/motion-somewhat.svg'
      },
      {
        id: 'veryImportant',
        label: 'Very important',
        description: 'Excellent motion isolation is essential',
        image: '/images/motion-very.svg'
      }
    ],
    scientificNote: 'Memory foam typically provides the best motion isolation, followed by latex. Innerspring mattresses generally transfer the most motion, while hybrids fall somewhere in between depending on their construction.'
  },
  {
    id: 'mattressType',
    question: 'Do you have a preferred mattress type?',
    description: 'Different mattress types offer distinct benefits and drawbacks based on their materials and construction.',
    options: [
      {
        id: 'noPreference',
        label: 'No strong preference',
        description: 'Open to recommendations',
        image: '/images/no-preference.svg'
      },
      {
        id: 'memoryFoam',
        label: 'Memory Foam',
        description: 'Contouring with pressure relief',
        image: '/images/memory-foam.svg'
      },
      {
        id: 'innerspring',
        label: 'Innerspring',
        description: 'Bouncy with good airflow',
        image: '/images/innerspring.svg'
      },
      {
        id: 'latex',
        label: 'Latex',
        description: 'Responsive and durable',
        image: '/images/latex.svg'
      },
      {
        id: 'hybrid',
        label: 'Hybrid',
        description: 'Combination of coils and foam',
        image: '/images/hybrid.svg'
      },
      {
        id: 'airbed',
        label: 'Airbed',
        description: 'Adjustable firmness',
        image: '/images/airbed.svg'
      },
      {
        id: 'organic',
        label: 'Organic/Natural',
        description: 'Eco-friendly materials',
        image: '/images/organic.svg'
      }
    ],
    scientificNote: 'Each mattress type has distinct properties: memory foam excels in pressure relief and motion isolation but may retain heat; latex offers durability and responsiveness; innerspring provides cooling and bounce; hybrids aim to combine benefits of multiple materials.'
  },
  {
    id: 'ecoFriendly',
    question: 'How important are eco-friendly materials to you?',
    description: 'Eco-friendly mattresses use sustainable materials and manufacturing processes to reduce environmental impact.',
    options: [
      {
        id: 'notImportant',
        label: 'Not important',
        description: 'Not a priority in your decision',
        image: '/images/eco-not-important.svg'
      },
      {
        id: 'somewhatImportant',
        label: 'Somewhat important',
        description: 'Would prefer eco-friendly options',
        image: '/images/eco-somewhat.svg'
      },
      {
        id: 'veryImportant',
        label: 'Very important',
        description: 'A top priority in your decision',
        image: '/images/eco-very.svg'
      }
    ],
    scientificNote: 'Truly eco-friendly mattresses typically use materials like natural latex, organic cotton and wool, and avoid harmful chemicals. Certifications like GOLS (Global Organic Latex Standard) and GOTS (Global Organic Textile Standard) help verify environmental claims.'
  }
]
