/**
 * The picture each project shows as a card in the homepage fan: the top of its phone capture, cropped to the fan's 4:5
 * card and sized for it (made by scripts/generate-fan-thumbnails.py). Every project has one; projectFan.test.ts checks.
 */

import farshAquatics from '@/assets/projects/fan/farsh-aquatics.webp'
import p604kars from '@/assets/projects/fan/604kars.webp'
import storage4666 from '@/assets/projects/fan/storage4666.webp'
import maidNew from '@/assets/projects/fan/maid-new.webp'
import ganjinehOfogh from '@/assets/projects/fan/ganjineh-ofogh.webp'
import mend from '@/assets/projects/fan/mend.webp'
import octaiq from '@/assets/projects/fan/octaiq.webp'
import shamsiCalendar from '@/assets/projects/fan/shamsi-calendar.webp'
import mendApp from '@/assets/projects/fan/mend-app.webp'
import jarvis from '@/assets/projects/fan/jarvis.webp'
import stayin from '@/assets/projects/fan/stayin.webp'
import motionKit from '@/assets/projects/fan/motion-kit.webp'

export const FAN_IMAGES: Readonly<Record<string, string>> = {
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
