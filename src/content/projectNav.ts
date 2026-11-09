/**
 * The small picture of each project in the Work page's row of projects (ProjectChapterNav): the same crop as the fan's
 * card, at 112x140 (56x70 on screen, at 2x), about 3 KB each. Made by scripts/generate-fan-thumbnails.py.
 */

import farshAquatics from '@/assets/projects/nav/farsh-aquatics.webp'
import p604kars from '@/assets/projects/nav/604kars.webp'
import storage4666 from '@/assets/projects/nav/storage4666.webp'
import maidNew from '@/assets/projects/nav/maid-new.webp'
import ganjinehOfogh from '@/assets/projects/nav/ganjineh-ofogh.webp'
import mend from '@/assets/projects/nav/mend.webp'
import octaiq from '@/assets/projects/nav/octaiq.webp'
import shamsiCalendar from '@/assets/projects/nav/shamsi-calendar.webp'
import mendApp from '@/assets/projects/nav/mend-app.webp'
import jarvis from '@/assets/projects/nav/jarvis.webp'
import stayin from '@/assets/projects/nav/stayin.webp'
import motionKit from '@/assets/projects/nav/motion-kit.webp'

export const NAV_IMAGES: Readonly<Record<string, string>> = {
  'farsh-aquatics': farshAquatics,
  '604kars': p604kars,
  storage4666: storage4666,
  'maid-new': maidNew,
  'ganjineh-ofogh': ganjinehOfogh,
  mend: mend,
  octaiq: octaiq,
  'shamsi-calendar': shamsiCalendar,
  'mend-app': mendApp,
  jarvis: jarvis,
  stayin: stayin,
  'motion-kit': motionKit,
}
