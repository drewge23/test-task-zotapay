import relativeTime from 'dayjs-ext/plugin/relativeTime'
import localizedFormat from 'dayjs-ext/plugin/localizableFormat'
import dayjs from "dayjs-ext";

dayjs.extend(relativeTime)
    .extend(localizedFormat)

export default dayjs