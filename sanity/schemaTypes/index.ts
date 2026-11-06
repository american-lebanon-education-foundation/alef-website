import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { blogType } from './blogType'
import { authorType } from './authorType'
import { videoType } from './videoType'
import { shortType } from './shortType'
import { podcastType } from './podcastType'
import { localizedString } from './localizedString'
import { localizedText } from './localizedText'
import { localizedBlockContent } from './localizedBlockContent'
import { webinarType } from './webinarType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, blogType, authorType, videoType, shortType, podcastType, localizedString, localizedText, localizedBlockContent, webinarType],
}
