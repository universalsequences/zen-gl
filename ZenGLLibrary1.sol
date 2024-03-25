
pragma solidity ^0.8.20;

contract ZenGLLibrary1 {
    string public data;

    constructor() {
        data = "NES=5]=\"LINES\"}(Se||(Se={}));const Ie=(e,t)=>{switch(t){case Se.TRIANGLE_STRIP:return e.TRIANGLE_STRIP;case Se.TRIANGLE_FAN:return e.TRIANGLE_FAN;case Se.TRIANGLE_STRIP:return e.TRIANGLE_STRIP;case Se.LINES:return e.LINES;case Se.LINE_LOOP:return e.LINE_LOOP;case Se.LINE_STRIP:return e.LINE_STRIP;default:return e.TRIANGLES}},Be=e=>(...t)=>r((r=>{let n=t.map((e=>r.gen(e))),[a]=r.useVariables(\"matVal\"),i=r.printType(e),o=`${i} ${a} = ${i} (${n.map((e=>e.variable)).join(\",\")}); `;return r.emit(e,o,a,...n)})),Ne=Be(n.Mat2),Ue=Be(n.Mat3),Pe=Be(n.Mat4),Ve=(e,t,r,n)=>{const a=$(1,G($(e,2)));return Pe($(a,t),0,0,0,0,a,0,0,0,0,$(y(n,r),F(r,n)),-1,0,0,$(L(2,L(n,r)),F(r,n)),0)},we=(e,t,r)=>{let n=fe(W(F(e,t))),a=fe(W(K(r,n))),i=fe(K(n,a));return Pe(a.x,i.x,n.x,0,a.y,i.y,n.y,0,a.z,i.z,n.z,0,L(-1,te(a,e)),L(-1,te(i,e)),L(-1,te(n,e)),1)},De=(e,t,a,i,o)=>{let l,u,s=[],f=t,m=\"_\"+Math.floor(1e5*Math.random()),c=()=>r((r=>{let f=r;for(;f.parentContext;)f=f.parentContext;let[d]=r.useVariables(\"uniform\"+m);l&&(d=l.name),l={name:d,type:e},s.push(f);let b=r.emit(e,\"\",d);return b.uniforms||(b.uniforms=[]),b.uniforms.push(l),r.uniforms.push(c),e===n.Sampler2D&&(u={initialized:!1,width:a||1,height:i||1,initialData:Array.isArray(t)?new Uint8Array(t):null,feedback:o,uniformName:o?d:void 0},r.textures.push(u),r.parentContext&&r.parentContext.textures.push(u)),r.parentContext&&r.parentContext.uniforms.push(c),b}));return c.set=(e=f)=>{if(f=e,u&&l){if(!Array.isArray(e)&&!ArrayBuffer.isView(e))return;for(let t of s){let r=t.webGLRenderingContext,n=t.webGLProgram;if(r&&n&&void 0!==u.unit&&u.texture){let t=u.texture,a=u.format||r.RGBA,i=u.type||r.UNSIGNED_BYTE;r.useProgram(n),r.activeTexture(r.TEXTURE0+u.unit),r.bindTexture(r.TEXTURE_2D,t);let o=ArrayBuffer.isView(e)?e:new Uint8Array(e);r.texImage2D(r.TEXTURE_2D,0,a,u.width,u.height,0,a,i,o);let s=r.getUniformLocation(n,l.name);r.uniform1i(s,u.unit)}}}else if(l)for(let t of s){let r=t.webGLRenderingContext,n=t.webGLProgram;if(r&&n){let t=r.getUniformLocation(n,l.name);r.useProgram(n),r.uniform1f(t,e)}}},c.isTexture=()=>void 0!==u,c.getWidth=()=>a,c.getHeight=()=>i,c},Ce=E;return t})()));;window.gl = gl;";
    }

    function getData() public view returns  (string memory) {
        return data;
    }
}
