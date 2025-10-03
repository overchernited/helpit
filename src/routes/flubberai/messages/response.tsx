import ExpandedParagraph from "~/routes/discover/Components/Posts/ExpandedParagraph"
import { Motion } from "solid-motionone"

interface Props {
    text: string
}
const ResponseMessage = (props: Props) => {
    return (
        <Motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            class=" bg-[var(--color-tertiary)] text-[var(--font-color)]  w-auto h-auto max-w-[60%] md:max-w-[40%] rounded-lg p-2 text-md">
            <ExpandedParagraph>{props.text}</ExpandedParagraph>
        </Motion.div>
    )
}



export default ResponseMessage