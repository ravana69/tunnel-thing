const props = {
        width: window.innerWidth,
        height: window.innerHeight
      },
      
      scene = new THREE.Scene(),
      donutGeometry = new THREE.TorusGeometry(0.55, 0.2, 3, 6),
      material = new THREE.MeshBasicMaterial({ color:'#0f0' }),
      camera = new THREE.PerspectiveCamera(70, props.width/props.height, 0.1, 100),
      renderer = new THREE.WebGLRenderer({ canvas: c }),
      
      onWheel = (e) => {
        if ( camera.position.z<-200 && e.deltaY<0 ) return
        if ( camera.position.z>1 && e.deltaY>0 ) return
        gsap.to(camera.position, { z:'-='+(e.deltaY * -0.01), overwrite:true })
      },
      
      onMouseMove = (e) => {
        gsap.to(camera.rotation, {
          duration:1,
          x:-(e.clientY/window.innerHeight-0.5),
          y:-(e.clientX/window.innerWidth-0.5)
        })
      },
        
      onResize = (e) => {
        props.width = window.innerWidth
        props.height = window.innerHeight

        camera.aspect = props.width / props.height
        camera.updateProjectionMatrix()

        renderer.setSize(props.width, props.height)
        renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) )
      },
      
      tl = gsap.ticker.add(        
        ()=> renderer.render(scene, camera)
      )


for (let i=0; i<600; i++) {
  const donut = new THREE.Mesh(donutGeometry, new THREE.MeshBasicMaterial({ color:'hsl('+i+',100%,50%)' }))
  // donut.position.x = gsap.utils.random(-6, 6)
  // donut.position.y = gsap.utils.random(-6, 6)
  donut.position.z = -i/3 //gsap.utils.random(-25, 25)
  donut.rotation.y = Math.PI
  // donut.rotation.y = gsap.utils.random(0, Math.PI)

  scene.add(donut)  
  // tl.add(gsap.to(donut.rotation, {
  //   duration: gsap.utils.random(3,4),
  //   x: (i)=> (i%2==0)? '+='+2*Math.PI : '-='+2*Math.PI,
  //   y: (i)=> (i%2==0)? '+='+2*Math.PI : '-='+2*Math.PI,
  //   repeat: -1,
  //   ease: 'none'
  // }), 0)
}

gsap.to(camera.position, { duration:9, z:-100 })
scene.add(camera)

window.addEventListener('wheel', onWheel)
window.addEventListener('mousemove', onMouseMove)
window.addEventListener('resize', onResize)
onResize()