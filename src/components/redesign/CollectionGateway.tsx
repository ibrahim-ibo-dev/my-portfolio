import "./collection-gateway.css";
export default function CollectionGateway({href,title,detail}:{href:string;title:string;detail:string}){
  return <a className="nx-collection-gateway" href={href}>
    <div><span>{detail}</span><strong>{title}</strong><small>{new URL(href).hostname}</small></div>
    <i aria-hidden="true"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 19 19 5M5 5h14v14"/></svg></i>
  </a>;
}
