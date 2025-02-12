import { ElementRef, Injectable } from '@angular/core';
import { NodeMenuAction, NodeMenuEvent } from './menu.events';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class NodeMenuService {
  public nodeMenuEvents$: Subject<NodeMenuEvent> = new Subject<NodeMenuEvent>();

  public fireMenuEvent(sender: HTMLElement, action: NodeMenuAction): void {
    const nodeMenuEvent: NodeMenuEvent = { sender, action };
    this.nodeMenuEvents$.next(nodeMenuEvent);
  }

  public hideMenuStream(treeElementRef: ElementRef): Observable<any> {
    return this.nodeMenuEvents$
      .filter((e: NodeMenuEvent) => treeElementRef.nativeElement !== e.sender)
      .filter((e: NodeMenuEvent) => e.action === NodeMenuAction.Close);
  }

  public hideMenuForAllNodesExcept(treeElementRef: ElementRef): void {
    this.nodeMenuEvents$.next({
      sender: treeElementRef.nativeElement,
      action: NodeMenuAction.Close
    });
  }
}
