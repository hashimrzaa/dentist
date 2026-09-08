export default function Container({ className = '', children, ...rest }) {
  return (
    <div className={`container-x ${className}`} {...rest}>
      {children}
    </div>
  )
}
