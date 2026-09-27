export interface Topic {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  icon?: React.ElementType; // Optional: for a specific icon per topic
}

// Example icons (ensure these are imported if used directly in data)
// import { Heart, Anchor, Pray, BookOpen, Smile, Waves, HandHelping, Compass, Shield } from 'lucide-react';

export const topics: Topic[] = [
  { 
    id: "overcoming-anxiety", 
    title: "Overcoming Anxiety", 
    titleZh: "克服焦虑",
    description: "Find peace and strength in God when facing anxiety.",
    descriptionZh: "在面对焦虑时，在神那里找到平安和力量。"
    // icon: Shield 
  },
  { 
    id: "gods-unchanging-love", 
    title: "God's Unchanging Love", 
    titleZh: "上帝不变的爱",
    description: "Explore the depths of God's constant and unwavering love.",
    descriptionZh: "探索上帝恒常不变的爱。"
    // icon: Heart
  },
  { 
    id: "trusting-god-in-uncertainty", 
    title: "Trusting God in Uncertainty", 
    titleZh: "在不确定性中信任上帝",
    description: "Learn to place your trust in God during uncertain times.",
    descriptionZh: "在不确定的时候学习信任上帝。"
    // icon: Anchor
  },
  { 
    id: "forgiveness-and-grace", 
    title: "Forgiveness and Grace", 
    titleZh: "宽恕与恩典",
    description: "Understand the power of forgiveness and God's abundant grace.",
    descriptionZh: "理解宽恕的力量和上帝丰富的恩典。"
    // icon: HandHelping
  },
  { 
    id: "the-power-of-prayer", 
    title: "The Power of Prayer", 
    titleZh: "祈祷的力量",
    description: "Discover the transformative impact of a consistent prayer life.",
    descriptionZh: "发现持续祈祷生活对个人生命的影响。"
    // icon: Pray // Lucide 'Pray' might not exist, consider 'MessageSquare' or 'Sparkles'
  },
  { 
    id: "finding-peace-in-christ", 
    title: "Finding Peace in Christ", 
    titleZh: "在基督里的平安",
    description: "Seek and find true peace that surpasses understanding in Jesus Christ.",
    descriptionZh: "寻求并找到在耶稣基督里超越理解的平安。"
    // icon: Waves 
  },
  { 
    id: "living-with-gratitude", 
    title: "Living with Gratitude", 
    titleZh: "怀着感恩生活",
    description: "Cultivate a heart of gratitude for God's blessings in all seasons.",
    descriptionZh: "在一年中的所有季节中培养对上帝祝福的感恩之心。"
    // icon: Smile
  },
  { 
    id: "walking-in-faith", 
    title: "Walking in Faith", 
    titleZh: "在信仰中行走",
    description: "Strengthen your journey of faith, one step at a time with God.",
    descriptionZh: "在神的带领下，一步一个脚印地加强你的信仰。"
    // icon: Footprints // Lucide 'Footprints' does not exist. Use alternative
  },
  { 
    id: "worship-in-difficult-times", 
    title: "Worship in Difficult Times", 
    titleZh: "在困难时期的敬拜",
    description: "Learn to worship God even amidst trials and tribulations.",
    descriptionZh: "在试炼和苦难中学习敬拜上帝。"
    // icon: Music // For worship, or a more abstract 'Star' for hope
  },
  { 
    id: "discovering-purpose-through-christ", 
    title: "Discovering Purpose through Christ", 
    titleZh: "通过基督发现目的",
    description: "Find your God-given purpose and calling through a relationship with Christ.",
    descriptionZh: "通过与基督的关系找到上帝赋予你的目的和呼召。"
    // icon: Compass
  },
];
