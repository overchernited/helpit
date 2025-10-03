import ExpandedParagraph from "~/routes/discover/Components/Posts/ExpandedParagraph"
import { Motion } from "solid-motionone"
interface Props {
    text: string
}

const RequestMessage = (props: Props) => {
    return (
        <Motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        class="w-full flex justify-end my-2">
            <div class="bg-[var(--color-primary)] text-[var(--font-color)]  w-auto h-auto max-w-[60%] md:max-w-[40%] rounded-lg p-2 text-md">
                <ExpandedParagraph>{props.text}</ExpandedParagraph>
            </div>
        </Motion.div>
    )
}

export default RequestMessage