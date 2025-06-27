interface Props {
  text: string; 
}

const Chip = (props: Props) => {
    const { text } = props;
    return (
    <div className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
        {text}
    </div>
  )
}

export default Chip